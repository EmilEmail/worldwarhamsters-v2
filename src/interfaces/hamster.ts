export interface HamsterWithId {
	name:string, 
	loves:string, 
	favFood:string, 
	imgName:string, 
	age:number, 
	games:number, 
	wins:number, 
	defeats:number, 
	firestoreId:string
}
export interface Hamster {
	name:string, 
	loves:string, 
	favFood:string, 
	imgName:string, 
	age:number, 
	games:number, 
	wins:number, 
	defeats:number
}
export interface HamsterWinsId {
	firestoreId: string
	loserId: string
	winnerId: string
}
