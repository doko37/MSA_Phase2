import React from 'react'
import styled from '@emotion/styled'

const Ctn = styled.input`
    border-radius: 1rem;
    background-color: rgba(0,0,0,0.4);
    padding: 0.5rem 1rem;
    width: 100%;
    border: none;
    color: white;
    font-weight: 600;
`

const SearchBar: React.FC<{
    value: string,
    onChange: (e: any) => void,
    changeCity: () => void,
    width?: number
}> = ({ value, onChange, changeCity, width }) => {
    return (
        <Ctn value={value} onChange={onChange} onSubmit={changeCity} onKeyDown={onChange} style={{ width }} />
    )
}

export default SearchBar