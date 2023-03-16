import { Image } from "expo-image";


export default function(props){
    const blurhash = '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';
    const {url,width,height,style} = props
    return (
        <Image 
            source={{uri: url}} 
            blurHash={blurhash}
            contentFit="cover"
            transition={1000}
            style={[{width, height}, style]} 
        />
    )
}