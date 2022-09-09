import React from 'react'
import styled from 'styled-components'
import day from '../images/tokyoday.jpg'
import night from '../images/tokyonight.jpg'

const Day = styled.img<{ opacity: number }>`
    position: fixed;
    top: 0;
    width: 100%;
    height: 100%;
    filter: blur(3px);
    object-fit: cover;
    opacity: ${props => props.opacity}%;
    transition: all 1s;
`

const Night = styled.img<{ opacity: number }>`
    position: fixed;
    top: 0;
    width: 100%;
    height: 100%;
    filter: blur(3px);
    object-fit: cover;
    opacity: ${props => props.opacity}%;
    transition: all 1s;
`

const Background: React.FC<{
    isDay: boolean
}> = ({ isDay }) => {
    return (
        <div>
            <Day opacity={isDay ? 100 : 0} src={day}></Day>
            <Night opacity={isDay ? 0 : 100} src={night}></Night>
        </div>
    )
}

export default Background