import styled from 'styled-components/macro';
import {useState} from 'react';

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

const ExampleCard = styled.div<{ color?: string }>`
  background-color: ${(props) => props.color ?  props.color : "#88db9e"};
  align-items: center;
  width: 400px;
  height: 200px;
  top: 10px;
  // position: relative;
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

export const BaseInputLabel = styled.div`
  font-family: VCR, sans-serif;
  color: ${({ theme }) => theme.colors.text};
  font-size: 12px;
  line-height: 16px;
  letter-spacing: 1.5px;
`;

export const BaseInputContainer = styled.div<{ error?: boolean }>`
  position: relative;
  width: 100%;
  height: 72px;
  background: rgba(255, 255, 255, 0.04);
  border-radius: 4px;
  margin-top: 8px;
  padding: 0 4px;
  border: ${({ theme }) => theme.border.width} ${({ theme }) => theme.border.style}
    ${(props) => (props.error ? ({ theme }) => theme.colors.red : `transparent`)};
  transition: border 0.25s;
`;

export const BaseInput = styled.input<{
  inputWidth?: string;
  fontSize?: number;
  lineHeight?: number;
}>`
  width: ${(props) => props.inputWidth || "80%"};
  height: 100%;
  font-size: ${(props) => props.fontSize || 40}px;
  line-height: ${(props) => props.lineHeight || 64}px;
  color: ${({ theme }) => theme.colors.primaryText};
  color: black;
  border: none;
  background: none;
  font-family: VCR, sans-serif;
  &:focus {
    color: ${({ theme }) => theme.colors.primaryText};
    color: black;
    background: none;
    border: none;
    box-shadow: 0 0 0 0 rgba(255, 255, 255, 0);
    border: rgba(255, 255, 255, 0);
  }
`;

export const BaseInputButton = styled.div`
  position: absolute;
  top: 50%;
  transform: translate(-16px, -50%);
  right: 0;
  background: ${({ theme }) => theme.colors.background.four};
  color: ${({ theme }) => theme.colors.primaryText};
  border-radius: 4px;
  padding: 8px;
  height: 32px;
  font-size: 11px;
  line-height: 16px;
  text-align: center;
  letter-spacing: 1.5px;
  cursor: pointer;
  font-family: VCR, sans-serif;
`;

export const HomeView: React.FC = () => {
  const [value, setValue] = useState("")
  const [num, setNum] = useState(0)

  const handleClick = () => {
    console.log("Clicked")
  }

  const handleSubmit = (e: any) => {
    console.log(value);
    e.preventDefault();
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawInput = e.target.value;
    setValue(rawInput);
  }

  return (
    <BasicView>
      <ExampleCard  color={"#92d9e0"}>
        <ExampleButton role="button" onClick={handleSubmit}>
        {"Example Button"}
        </ExampleButton>
        <ExampleInput
          type = "text"
          value = {value}
          onChange = {handleInputChange}
        />
      </ExampleCard>
      <br/>
      <ExampleCard>
        <ExampleButton role="button" onClick={handleSubmit}>
        {"Example Button"}
        </ExampleButton>
        <ExampleInput
          type = "text"
          value = {value}
          onChange = {handleInputChange}
        />
      </ExampleCard>
      <br/>
      <BaseInputLabel>AMOUNT</BaseInputLabel>
      <BaseInputContainer>
        <BaseInput
          type = "text"
          value = {value}
          onChange = {handleInputChange}
        />
        <BaseInputButton onClick={handleSubmit}>MAX</BaseInputButton>
      </BaseInputContainer>
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