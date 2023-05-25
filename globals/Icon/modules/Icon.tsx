import { FC } from "react";
import { styles } from "../styles";

type DivType = React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>
type ImgType = React.ImgHTMLAttributes<HTMLImageElement>

type DivOrImgType = DivType | ImgType 

const typeGuard = ( e: DivOrImgType ): e is DivOrImgType => {

    const isImg = e as ImgType

    return !!isImg.src
}

const Icon: FC<DivOrImgType> = ( props ) => {

    const isImg = typeGuard( props )

    if( isImg ) return (
        <div className={ styles.icon_wrap }>
            <img 
                className={ styles.icon }
                { ...( props as ImgType ) }
            />
        </div>
    )

    return (
        <div className={ styles.icon_wrap }>
            <div className={ styles.icon }>
                { (props as DivType).children }
            </div>
        </div>
    )
}

export default Icon