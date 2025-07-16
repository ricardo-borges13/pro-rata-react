import * as S from './style.Header'

type headerProps = {
    image: string;
    title: string;        
}

export const Header = ({image, title}: headerProps) => {
  
    
    return (
       <>
        <S.HeaderContainer className="header-container">
            <div className="header-content">
                <img src={image} alt={image} height={100}/>                
            </div>
            <div>
                <S.LabelTitulo className="labelTitulo">{title}</S.LabelTitulo>
            </div>
        </S.HeaderContainer>


       </>
    )
}