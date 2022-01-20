import styled from 'styled-components'

const BasicView = styled.div<{connected?: boolean}>`
  display:flex;
  justify-content:center;
  align-items:center;
  position: relative;
  top: 50%;
  transform: translateY(650%);
`

export const HomeView = () => {
  return (
    <BasicView>
      <div>Home</div>
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