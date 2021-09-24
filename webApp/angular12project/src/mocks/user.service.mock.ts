import { UserService, User, Type } from "../app/user.service";
import { Observable, of, EMPTY } from "rxjs";

class MockUserService extends UserService {

  userMock: User[] = [
    {_id: "GRSLCU97L14E281J", name: "Luca", surname: "Grassi", username: "luca", password: "12345", mail: "lucagra97@gmail.com", phone: "3126784433", dob: new Date("1997-07-14"), type: Type.DOCTOR},
    {_id: "SLSMTN96D60B354H", name: "Martina", surname: "Salis", username: "martina", password: "6789", mail: "marti.salis20@gmail.com", phone: "3331203042", dob: new Date("1996-04-20"), type: Type.DOCTOR},
    {_id: "GRSNCL04M30E281N", name: "Nicola", surname: "Grassi", username: "nicola", password: "6789", mail: "n.grassi@gmail.com", phone: "3334123599", dob: new Date("2004-08-30"), type: Type.DOCTOR},
    {_id: "GRSLNE00R53E281N", name: "Elena", surname: "Grassi", username: "elena", password: "6789", mail: "e.grassi@gmail.com", phone: "3198632459", dob: new Date("2000-10-13"), type: Type.DOCTOR},
    {_id: "RSSMRA66D01A001J", name: "Mario", surname: "Rossi", username: "mario", password: "6789", mail: "m.rossi@gmail.com", phone: "3327801248", dob: new Date("1966-04-01"), type: Type.DOCTOR},
    {_id: "BNCCRL75P55B153R", name: "Carla", surname: "Bianchi", username: "carla", password: "6789", mail: "carla.bianchi@tiscali.it", phone: "3248900776", dob: new Date("1975-09-15"), type: Type.PATIENT},
    {_id: "FRRMRC80M08E048O", name: "Marco", surname: "Ferrari", username: "marco", password: "6789", mail: "marco.ferr@gmail.com", phone: "3356778933", dob: new Date("1980-08-08"), type: Type.PATIENT},
    {_id: "RBRRMN95L43I747W", name: "Roberta", surname: "Romano", username: "roberta", password: "6789", mail: "robi.romano95@hotmail.com", phone: "3927765543", dob: new Date("1995-07-03"), type: Type.PATIENT},
    {_id: "NTNLBR42E01D736P", name: "Antonio", surname: "Bardi", username: "antonio", password: "6789", mail: "antonio_romano@gmail.com", phone: "3467896432", dob: new Date("1942-04-01"), type: Type.PATIENT},
    {_id: "FNTMRZ89T65I741T", name: "Marzia", surname: "Fontana", username: "marzia", password: "6789", mail: "marzia.rom89@live.com", phone: "3215789321", dob: new Date("1989-12-25"), type: Type.PATIENT},
    {_id: "GLLSVT68P22G912N", name: "Salvatore", surname: "Gallo", username: "salvatore", password: "6789", mail: "gallo_tore@gmail.com", phone: "3457789113", dob: new Date("1968-09-22"), type: Type.PATIENT},
    {_id: "DSNGNN72B50E971L", name: "Giovanna", surname: "De Santis", username: "giovanna", password: "6789", mail: "de_santis.g5@tiscali.com", phone: "3266789235", dob: new Date("1972-02-10"), type: Type.PATIENT},
    {_id: "MRNMRZ93C30E410S", name: "Maurizio", surname: "Marini", username: "maurizio", password: "6789", mail: "maur_marini@tiscali.com", phone: "3335699887", dob: new Date("1993-03-30"), type: Type.PATIENT},
    {_id: "PRSCHR74A44A859S", name: "Chiara", surname: "Parisi", username: "chiara", password: "6789", mail: "chia.parisi@hotmail.com", phone: "3356732221", dob: new Date("1974-01-04"), type: Type.PATIENT},
    {_id: "SPSCRI45D25F839L", name: "Ciro", surname: "Esposito", username: "ciro", password: "6789", mail: "esp_ciro@gmail.com", phone: "3266789235", dob: new Date("1945-04-25"), type: Type.PATIENT},
    {_id: "CSNZNE62A12L736G", name: "Zeno", surname: "Cosini", username: "admin", password: "123", mail: "lucagra97@gmail.com", phone: "3268793592", dob: new Date("1965-08-12"), type: Type.ADMIN}
  ];

  info(_id: String): Observable<User> {
    let res = this.userMock.find(element => element._id == _id);
    if(res != undefined) {
      return of(res);
    }
    else {
      return EMPTY;
    }
  }

}
