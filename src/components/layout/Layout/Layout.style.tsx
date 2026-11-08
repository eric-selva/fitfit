import styled from "styled-components";

const LayoutWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  /* Altura visible real en móvil (sin las barras del sistema/navegador) */
  height: 100dvh;
  max-width: 500px;
  margin: 0 auto;
`;

const MainContent = styled.main<{ hide: boolean }>`  
  margin: 0 auto;
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
  flex-grow: 1;
  margin-top: ${({ hide, theme }) => (hide ? "0" : `${theme.layout.header_height}px`)};
  overflow: hidden;
`;

export { LayoutWrapper, MainContent };
