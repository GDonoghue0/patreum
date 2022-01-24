import styled from 'styled-components/macro'

const BasicView = styled.div<{connected?: boolean}>`
  display: grid;
  justify-content: center;
  align-items: center;
`

// const ExampleCard = styled.div<{ color?: string }>`
//   display: flex;
//   flex-direction: column;
//   flex-wrap: wrap;
//   background-color: ${({ theme }) => theme.colors.background.two};
//   border: 2px ${({ theme }) => theme.border.style} ${(props) => props.color}00;
//   border-radius: ${({ theme }) => theme.border.radius};
//   transition: 0.25s box-shadow ease-out, 0.25s border ease-out;
//   width: 290px;
//   min-height: 492px;
//   position: relative;
//   height: 100%;
//   padding: 16px;
//   @media (max-width: ${({ theme }) => theme.sizes.md}px) {
//     width: 343px;
//   }
//   &:hover {
//     box-shadow: ${(props) => props.color}66 8px 16px 80px;
//     border: 2px ${({ theme }) => theme.border.style} ${(props) => props.color};
//   }
// `;

const ExampleCard = styled.div`
  background-color: #92d9e0;
  align-items: center;
  width: 400px;
  height: 200px;
  top: 10px;
  position: relative;
  border: solid;
  border-width: 1px;
  border-color: black;
  justify-content: center;
  display: grid;
`

const ExampleInput = styled.input`
  max-width: 80px;
  margin: 20px;
  padding: 10px;
  background-color: #667285;
  border-radius: 8px;
`

const ExampleButton = styled.div`
  border-radius: ${({ theme }) => theme.border.radius};
  padding: 12px 16px;
  background-color: #667285;
  align-items: center;
  height: fit-content;
  text-align: center;
  &:hover {
    opacity: ${({ theme }) => theme.hover.opacity};
  }
`;

const handleClick = () => {
  console.log("Clicked")
}

export const HomeView = () => {
  return (
    <BasicView>
      <ExampleCard>
        <ExampleButton role="button" onClick={handleClick}>
        {"Example Button"}
        </ExampleButton>
        <ExampleInput/>
      </ExampleCard>
    </BasicView>
  )
}

export const BrowseView = () => {
  return (
    <BasicView>
      <div>Browse</div>
    </BasicView>
  )
}

export const OtherView = () => {
  return (
    <BasicView>
      <div>Other</div>
    </BasicView>
  )
}