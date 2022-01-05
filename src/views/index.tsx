import styled from 'styled-components'

const BasicView = styled.div`
    display:flex;
    justify-content:center;
    align-items:center;
`

export const HomeView = () => {
    return (
        <BasicView>
            <div>Home</div>
        </BasicView>
    )
}

export const LoginView = () => {
    return (
        <BasicView>
            <div>Login</div>
        </BasicView>
    )
}