import * as S from './style.Footer'

type footerProps = {
    title: string;
    version: string;
}

export const Footer = ({title, version}: footerProps) => {
    return (
        <S.footerContainer>
            <S.smallFooter> &copy; <span id="year"></span> {title} <mark id="markVersao">Versão {version}</mark></S.smallFooter>
        </S.footerContainer>
    )
}