type footerProps = {
    title: string;
    version: string;
}

export const Footer = ({title, version}: footerProps) => {
    return (
        <footer>
            <small> &copy; <span id="year"></span> {title} {version} <mark id="markVersao">Versão {version}</mark></small>
        </footer>
    )
}