import { View,Animated,Easing, Dimensions } from 'react-native';
import { useRef,memo } from 'react';
import { useEffect } from 'react';

export default memo(function(props){
    const animatedValue = useRef(new Animated.Value(0)).current;
    const {children} = props

    function popup(){
        Animated.timing(animatedValue,{
            toValue:1,
            duration:1000,
            useNativeDriver: false,
            easing:Easing.linear
          }).start();
    }

    useEffect(()=>{
        popup();
    },[])


    return (
        <View style={{
            flex:1,
            backgroundColor:'#00000050',
            position:'absolute',
            top:0,
            left:0,
            height:'100%',
            width:'100%',
            zIndex:10
        }}>
            <Animated.View style={[{
                width:Dimensions.get('screen').width,
                backgroundColor:'#ffffff',
                position:'absolute',
                alignItems:'center',
                justifyContent:'center',
                bottom:0,
                left:0,
                zIndex:1,
                padding:20,
                borderTopRightRadius:20,borderTopLeftRadius:20
            },{
                transform:[
                    {translateY: animatedValue.interpolate({
                        inputRange: [0, 1],
                        outputRange: [Dimensions.get('screen').height/4, 0]
                    })}
                ]
            }]}>
                {children}
            </Animated.View>
        </View>
        
    )
})