import {
  SplashScreen,
  Stack ,
  usePathname, 
  useSearchParams,
} from "expo-router";
import Constants from 'expo-constants';
import { 
    useFonts, 
    Montserrat_400Regular, 
    Montserrat_500Medium, 
    Montserrat_700Bold,
    Montserrat_900Black 
} from '@expo-google-fonts/montserrat';
import { useEffect, useRef, useState } from "react";
import Logo from "../components/Logo/index.js";
import { Animated, Text, View } from 'react-native';
import globals from "../store/globals/index.js";
import { Entypo } from "@expo/vector-icons";
import CustomModal from "../components/CustomModal/index.js";
import { Pressable } from 'react-native';

export default function Layout() {
    const pathname = usePathname();
    const params = useSearchParams();
    const globalSettings = globals();
    const [logoColor, setLogoColor] = useState('#ffffff');
    const [iconsColor, setIconsColor] = useState('#ffffff');
    const [currentBgColor, setCurrentBgColor] = useState('transparent');
    const [modalVisible, setModalVisible] = useState(false);

    const backgroundColor = useRef(new Animated.Value(0)).current;

    const interpolatedColor = backgroundColor.interpolate({
        inputRange: [0, 1],
        outputRange: [currentBgColor, globalSettings.homeHeaderBgColor],
    });

    useEffect(() => {
        if(globalSettings.homeHeaderBgColor == '#ffffff'){
            setLogoColor('#d17f3c');
            setIconsColor('#000000');
        } 
        else{
            setLogoColor('#ffffff');
            setIconsColor('#ffffff');
        }

        if(globalSettings.homeHeaderBgColor != currentBgColor){
            Animated.timing(backgroundColor, {
                toValue: 1,
                duration: 1000,
                useNativeDriver: false,
            }).start(()=>{
                setCurrentBgColor(globalSettings.homeHeaderBgColor);
                backgroundColor.setValue(0);
            });
        }
    }, [globalSettings.homeHeaderBgColor]);

    
    useEffect(() => {
        console.log({ pathname, params });
    }, [pathname, params]);

    const [fontsLoaded] = useFonts({
        Montserrat_400Regular, 
        Montserrat_500Medium, 
        Montserrat_700Bold, 
        Montserrat_900Black,
    });

    if (!fontsLoaded) {
        return <SplashScreen />;
    }
    return (
        <>
            <Stack
                screenOptions={{
                    header: ()=>{
                        return(
                            <Animated.View style={{height:Constants.statusBarHeight + 50, width:'100%',backgroundColor:interpolatedColor}}>  
                                <View style={{height:Constants.statusBarHeight}}></View> 
                                <View style={{height:50,alignItems:'center',padding:5,flexDirection:'row',justifyContent:'space-between'}}>
                                    <Logo style={{color:logoColor}} />    
                                    <View style={{flexDirection:'row',gap:20}}>
                                        <Entypo name="shopping-cart" size={28} color={iconsColor} />
                                        <Entypo name="user" size={28} color={iconsColor}  />
                                        <Pressable onPress={()=>{setModalVisible(true)}}><Entypo name="menu" size={28} color={iconsColor}  /></Pressable>
                                    </View>
                                </View>                         
                            </Animated.View>
                        );
                    },
                    headerTransparent:true,
                    
                }}
            />
            {
                modalVisible &&
                <CustomModal>
                    <View style={{flex:1,justifyContent:'center',alignItems:'center',padding:10,gap:20}}>
                        <Text style={{fontFamily:'Montserrat_900Black'}}>Demo Aplikasyonu</Text>
                        <Text>beije. demo app - Hidayet Can Özcan</Text>
                        <Pressable onPress={()=>setModalVisible(false)} style={{backgroundColor:'#000000',borderRadius:5,padding:20}}>
                            <Text style={{color:'#ffffff'}}>Tamam</Text>
                        </Pressable>
                    </View>
                </CustomModal>
            }
        </>
    );
}