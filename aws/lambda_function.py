import json
import boto3
from botocore.exceptions import ClientError

print('Loading function')
client = boto3.client('dynamodb')
client_ses = boto3.client('ses',region_name='us-east-2')
client_mqtt = boto3.client('iot-data', region_name='us-east-2')

def send_notice(patient, sensor_type, sensor_data, doctor, board):
    response = client.query(TableName='doctor_notice', KeyConditionExpression="#DYNOBASE_doctor_id = :pkey", ExpressionAttributeNames={"#DYNOBASE_doctor_id": "doctor_id"}, ExpressionAttributeValues={":pkey": doctor})
    print(response)
    topic = '$aws/things/obj-' + board +'/shadow/notice'
    print(topic)

    response_mqtt = client_mqtt.publish(topic=topic, qos=0, payload=json.dumps({"foo":"bar"}))
    print(response_mqtt)
    print(response['Items'][0]['data']['M']['notice_type']['S'] == 'E-MAIL')

    if(response['Items'][0]['data']['M']['notice_type']['S'] == 'E-MAIL'):
        string_sensor = ''
        if(sensor_type == '1'):
            string_sensor = ' battito cardiaco'
        else:
            string_sensor = 'la temperatura'

        try:
            response = client_ses.send_email(
                Destination = {
                    'ToAddresses': [
                        response['Items'][0]['data']['M']['mail']['S'],
                        ],
                },
                Message = {
                    'Body': {
                        'Html': {
                            'Data': '<html><head></head><body><h1>Notifica paziente ' + patient + '</h1><p>Il sensore del' + string_sensor + ' del paziente ' + patient + ' ha superato la soglia limite e ha un valore di ' + sensor_data + '.</p></body></html>'
                        },
                        'Text': {
                            'Data': "Il sensore del" + string_sensor + " del paziente " + patient + "\r\n ha superato la soglia limite e ha un valore di " + sensor_data + "."
                        },
                    },
                    'Subject': {
                        'Charset': "UTF-8",
                        'Data': "Notifica paziente " + patient,
                    }
                },
                Source = 'lucagra97@live.it',
            )
        except ClientError as e:
            print(e.response['Error']['Message'])
        else:
            print("Email sent! Message ID:")
            print(response['MessageId'])



def lambda_handler(event, context):
    #print("Received event: " + json.dumps(event, indent=2))
    for record in event['Records']:
        response = client.query(TableName='patient_threshold', KeyConditionExpression="#DYNOBASE_mac_address = :pkey", ExpressionAttributeNames={"#DYNOBASE_mac_address": "mac_address"}, ExpressionAttributeValues={":pkey": record['dynamodb']['NewImage']['mac_address']})
        print(response)

        for item in response['Items']:
            for thr in item['data']['L']:
                for single_data in record['dynamodb']['NewImage']['device_data']['M']['data']['L']:
                    if(single_data['M']['sensor']['N'] == thr['M']['type']['N']):
                        if(single_data['M']['data']['N'] >= thr['M']['threshold']['N']):
                            send_notice(patient=item['patient_id']['S'], sensor_type=thr['M']['type']['N'], sensor_data=single_data['M']['data']['N'], doctor=item['doctor_id'], board=item['mac_address']['S'])


        print(record['eventID'])
        print(record['eventName'])
        print("DynamoDB Record: " + json.dumps(record['dynamodb']['NewImage']['device_data'], indent=2))
    return 'Successfully processed {} records.'.format(len(event['Records']))

