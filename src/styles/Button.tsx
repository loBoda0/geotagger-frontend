import styled, { css } from 'styled-components'

const buttonStyles = css`
  width: 100%;
  height: 36px;
  border-radius: 0.5rem;
  padding: 0.5rem 1rem;
  cursor: pointer;
  font-weight: 600;
  transition: background-color 0.3s, color 0.3s, border-color 0.3s;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: .75rem;
`;

export const PrimaryButton = styled.button`
  ${buttonStyles}
  background-color: #619B8A;
  color: #ffffff;
  border: none;
`;

export const SecondaryButton = styled.button`
  ${buttonStyles}
  background-color: #ffffff;
  color: #619B8A;
  border: 1px solid #619B8A;
`;

export const GhostButton = styled.button`
  ${buttonStyles}
  background-color: transparent;
  color: #619B8A;
  border: none;
`;

export const GoogleButton = styled.button`
  ${buttonStyles}
  background-color: transparent;
  border: 1px solid #D0D5DD;
`;