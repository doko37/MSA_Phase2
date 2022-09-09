import React, { ReactNode } from 'react'
import styled from '@emotion/styled'

const Body = styled.div`
    position: relative;
    z-index: 15;
    background-color: rgba(0,0,0,0.4);
    padding: 2rem;
    height: auto;
    margin: 2rem 1rem;
    align-items: center;
    color: white;
    width: auto;
    flex-wrap: wrap;

    @media(min-width: 700px) {
      width: 600px;
      margin: 2rem auto;
      flex-wrap: nowrap;
    }
`

const Panel: React.FC<{
  children: ReactNode,
  borderRadius: "sm" | "md" | "lg",
  width?: number,
  paddingX: number,
  paddingY: number,
  display: "flex" | "block",
  justifyContent: "flex-start" | "flex-end" | "center" | "space-evenly" | "space-between" | "space-around"
}> = ({ borderRadius, width, display, justifyContent, children, paddingX, paddingY }) => {
  return (
    <Body style={{
      borderRadius: borderRadius === "sm" ? '0.5rem' : borderRadius === "md" ? "1rem" : "2rem",
      width,
      display,
      justifyContent,
      padding: `${paddingY}rem ${paddingX}rem`
    }}>
      {children}
    </Body>
  )
}

export default Panel
