export interface LoginProps {
    email?: string
    password?: string 
    loggedIn:Boolean
}

export interface SignUpProps {
    name?: string
    email?: string
    password?: string 
}


export type Arr = {launches : any[]}
  

export interface IObjectMap {
    [key: string | number]: any
}

export interface ILinkProps {  
    id:number
    index:number  
    url:string
    description :string
    createdAt: Date
    votes ?:number
    postedBy:IObjectMap
    data:IObjectMap

}

export interface ITimeDifference {
    current : number
    previous : number
}
