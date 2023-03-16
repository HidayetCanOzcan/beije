import {Text} from 'react-native';

export default function(props){
    const {style} = props;
    return (
        <Text style={[{color:'#d17f3c', fontFamily:'Montserrat_500Medium',fontSize:22},style]} >beije.</Text>
    )
}