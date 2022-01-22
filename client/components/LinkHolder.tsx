import React from 'react'
import { ILinkProps } from '../interfaces'

export const LinkHolder = (props:ILinkProps) => {
    return (
        <div>
            <p>{props.description} <a href={props.url}>{props.url}</a></p>
            {/* <p>{props.postedBy}</p> */}
            
        </div>
    )
}
