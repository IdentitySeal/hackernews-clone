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
    url:string
    description :string
    // createdAt: Date
}

