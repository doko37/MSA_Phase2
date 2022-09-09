import React from 'react'
import { Search as Icon } from '@mui/icons-material'
import styled from '@emotion/styled'

const Button = styled.div`
    color: ${props => props.color ? props.color : 'white'};
    margin-left: 1rem;
    cursor: pointer;
    transition: all 0.25s ease-in-out;
    width: 24px;
    height: 24px;

    &:hover {
        color: gray;
        transition: all 0.25s ease-in-out;
    }
`

const SearchButton: React.FC<{
    Search: () => void,
    defaultColor?: string
}> = ({ Search, defaultColor }) => {
    return (
        <Button onClick={Search} color={defaultColor}>
            <Icon />
        </Button>
    )
}

export default SearchButton