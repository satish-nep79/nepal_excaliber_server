import React from 'react'

const ImageView = props=>{
        return (
                <div>
                    <a href={props.record.params.imageUrl}>
                    <img src={props.record.params.imageUrl} 
                    alt="profile-photo"
                    width="100" height="100" 
                    />
                    </a>
                </div>
    );
    }

export default ImageView;