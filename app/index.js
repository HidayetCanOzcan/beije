import { ScrollView, View, Text, Pressable, Dimensions, TextInput } from "react-native";
import { Image } from "expo-image";
import { useState,useRef,Children } from 'react';
import Constants from 'expo-constants';
import globals from "../store/globals/index.js";
import { FlashList } from "@shopify/flash-list";
import { Entypo } from '@expo/vector-icons';
import { Video, AVPlaybackStatus } from 'expo-av';

import CustomImage from "../components/Image/index.js";

const blurhash =
  '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';
const videoHeight = (720/1030)*Dimensions.get('screen').width;

export default function() {
  const globalSettings = globals();
  const [selectedImage, setSelectedImage] = useState(0);
  const video = useRef(null);
  const [status, setStatus] = useState({});
  const [email, setEmail] = useState('');
  const [currentIndex,setCurrentIndex] = useState(0);
  const viewabilityConfig = {
      itemVisiblePercentThreshold: 25,
      waitForInteraction: true,
  };
  function onViewableItemsChanged({ viewableItems, changed }){
      const firstViewable = viewableItems[0]?.key;
      if(firstViewable !== undefined){
          setCurrentIndex(firstViewable)
      }
  }
  const viewabilityConfigCallbackPairs = useRef([ { viewabilityConfig, onViewableItemsChanged }])   


  const images = [
    'https://beije.co/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fhome-why1.b15a1c37.png&w=640&q=75',
    'https://beije.co/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fhome-why2.563007f1.png&w=640&q=75',
    'https://beije.co/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fhome-why3.1a997b4f.png&w=640&q=75',
  ]
  function scrollHandler(e){
    const scrollY = e.nativeEvent.contentOffset.y;
    if(scrollY > 10 && globalSettings.homeHeaderBgColor =='transparent') globalSettings.homeHeaderBgColor = '#ffffff';
    else if(scrollY <= 10 && globalSettings.homeHeaderBgColor =='#ffffff') globalSettings.homeHeaderBgColor = 'transparent';
  }
  return (
    <ScrollView onScroll={scrollHandler} scrollEventThrottle={16} contentContainerStyle={{backgroundColor:'#faf5ee'}}>
      <View style={{position:'relative',height:500}}>
        <CustomImage 
          url='https://beije.co/_next/static/media/home-hero-mobile.d0e402a4.jpg'
          height={500}
          width='100%'
        />
        <View style={{marginTop:Constants.statusBarHeight+50,backgroundColor:'#00000070',height:500,position:'absolute',width:'100%',top:-50,justifyContent:'center',alignItems:'center',gap:20}}>
          <Text style={{fontFamily:'Montserrat_700Bold',color:'#ffffff',fontSize:26}}>Yepyeni bir regl deneyimi.</Text>
          <Text style={{fontFamily:'Montserrat_400Regular',color:'#ffffff',fontSize:12}}>Doğal, sürdürülebilir,zahmetsiz. Sana özel bir pakette, kapında.</Text>
          <Pressable style={{padding:10,borderRadius:20,backgroundColor:'#ffffff',justifyContent:'center',alignItems:'center',width:'90%'}}>
            <Text style={{fontFamily:'Montserrat_500Medium'}}>Kendi Paketini Oluştur!</Text>
          </Pressable>
          <Pressable style={{padding:10,borderRadius:20,backgroundColor:'#000000',justifyContent:'center',alignItems:'center',width:'90%'}}>
            <Text style={{fontFamily:'Montserrat_500Medium',color:'#ffffff'}}>Paketleri İncele</Text>
          </Pressable>
        </View>
        
      </View>
      <View style={{backgroundColor:'#442647'}}>
        <FlashList 
            data={[
              {
                id:1,
                title:'ORGANİK ÜRÜNLER & ULAŞILABİLİR FİYATLAR',
                imageUrl:'https://beije.co/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Ffeature-1.4125471e.png&w=128&q=75'
              },
              {
                id:2,
                title:'VEGAN & CRUELTY-FREE',
                imageUrl:'https://beije.co/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Ffeature-2.54e358f4.png&w=128&q=75'
              },
              {
                id:3,
                title:'ŞARTSIZ & SANA ÖZEL ABONELİK SİSTEMİ',
                imageUrl:'https://beije.co/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Ffeature-3.b2767d4f.png&w=128&q=75'
              },
              {
                id:4,
                title:'ALIŞVERİŞ = BAĞIŞ = SÜRDÜRÜLEBİLİR DEĞİŞİM',
                imageUrl:'https://beije.co/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Ffeature-4.61752b82.png&w=128&q=75'
              },
            ]}
            renderItem={({item})=>(
              <View style={{justifyContent:'center',alignItems:'center',gap:20,padding:20}}>
                <Text style={{fontFamily:'Montserrat_500Medium',fontSize:12,color:'white'}}>{item.title}</Text>
                <CustomImage 
                  url={item.imageUrl}
                  height={50}
                  width={50}
                />
              </View> 
            )}
            keyExtractor={item=>item.id}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{backgroundColor:'#442647'}}
            estimatedItemSize={259}
        />
      </View>
      <View style={{width:'100%',alignItems:'center'}}>
        <Text style={{fontFamily:'Montserrat_700Bold',width:350,textAlign:'center',marginTop:20}}>Regl olmayı heyecanla beklediğini hayal edebiliyor musun? Biz senin için ediyoruz.</Text>
        <Text style={{fontFamily:'Montserrat_400Regular',width:400,textAlign:'center',marginTop:20,fontSize:12}}>En doğal içeriklerle, en yüksek kalitede, ulaşılabilir fiyatlara. Koku yok. Adını bilmediğin maddeler yok. Hazırlıksız yakalanmak yok. Bizim ailemizden sana, daima sevgiyle.</Text>             
      </View>
      <FlashList 
        data={[
          {
            id:1,
            title:'beije Ped',
            imageUrl:'https://beije.co/_next/static/media/pad.7dbc2972.png'
          },
          {
            id:2,
            title:'beije Günlük Ped',
            imageUrl:'https://beije.co/_next/static/media/pantyliner.70455d27.png'
          },
          {
            id:3,
            title:'beije Tampon',
            imageUrl:'https://beije.co/_next/static/media/tampon.e5b2e17c.png'
          },
          {
            id:4,
            title:'beije Kap',
            imageUrl:'https://beije.co/_next/static/media/cup.6f6daa4d.png'
          },
        ]}
        renderItem={({item})=>(
          <View style={{justifyContent:'center',alignItems:'center',position:'relative',borderRadius:20,overflow:'hidden',marginHorizontal:10}}>
            <View style={{width:'100%',zIndex:1,position:'absolute',bottom:20}}>
              <Text style={{fontFamily:'Montserrat_700Bold',fontSize:22,color:'white',marginLeft:30}}>{item.title}</Text>
            </View>
            <CustomImage
              url={item.imageUrl}
              height={270}
              width={270}
            />
          </View>
        )}
        keyExtractor={item=>item.id}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{padding:20}}
        estimatedItemSize={248}
      />
      <View style={{backgroundColor:'#b9d54d',width:'100%',alignItems:'center',paddingVertical:50,paddingHorizontal:20}}>
          <Image
            source={{uri:images[selectedImage]}}
            style={{width:'100%',height:200}}
            placeholder={blurhash}
            contentFit="cover"
            transition={1000}
          />
          <Text style={{fontFamily:'Montserrat_500Medium',fontSize:28,marginTop:20}}>Neden beije</Text>
          <View style={{height:50,width:'100%',alignItems:'center',marginTop:20}}>
            <Pressable onPress={()=>setSelectedImage(0)}>
              <Text style={{fontSize:20,fontFamily:'Montserrat_500Medium',color:selectedImage===0 ? '#000000' : '#738439'}}>1.Kaliteli Ürünler</Text>
            </Pressable>
            <Text style={{fontFamily:'Montserrat_400Regular',fontSize:11,marginTop:5,textAlign:'center'}}>Regl olmanın doğaya ve bedenine en saygılı hali.</Text>
          </View>
          <View style={{height:50,width:'100%',alignItems:'center',marginTop:20}}>
            <Pressable onPress={()=>setSelectedImage(1)}>
              <Text style={{fontSize:20,fontFamily:'Montserrat_500Medium',color:selectedImage===1 ? '#000000' : '#738439'}}>2.Kolay Sistem</Text>
            </Pressable>
            <Text style={{fontFamily:'Montserrat_400Regular',fontSize:11,marginTop:5,textAlign:'center'}}>Zahmetsiz, sıkıntısız ve konfor dolu bir regl deneyimi.</Text>
          </View>
          <View style={{height:50,width:'100%',alignItems:'center',marginTop:20}}>
            <Pressable onPress={()=>setSelectedImage(2)}>
              <Text style={{fontSize:20,fontFamily:'Montserrat_500Medium',color:selectedImage===2 ? '#000000' : '#738439'}}>3.Makul Fiyatlar</Text>
            </Pressable>
            <Text style={{fontFamily:'Montserrat_400Regular',fontSize:11,marginTop:5,textAlign:'center'}}>Uygun fiyatlar öderken, cebinden çıkan paranın nereye, ne kadar gittiğini bil. Her zaman.</Text>
          </View>
          <Pressable style={{backgroundColor:'#000000',justifyContent:'center',alignItems:'center',borderRadius:20,padding:15,marginTop:30}}>
            <Text style={{fontFamily:'Montserrat_700Bold',color:'#ffffff'}}>Daha Detaylı Öğren</Text>
          </Pressable>
      </View>
      <View style={{marginTop:30,paddingHorizontal:20}}>
        <Text style={{fontFamily:'Montserrat_700Bold'}}>
          {
            `Yola; en iyi ürünleri, en zahmetsiz şekilde sana ulaştırma hayaliyle çıktık.

Her gün tüm kalbimiz ve aklımızla; Öğrenerek, özen göstererek, durmadan çalışarak ve hep daha da iyisini yapmaya çalışarak devam ediyoruz.
            
Seni de bekliyoruz.`
          }
        </Text>
        <CustomImage 
          url='https://beije.co/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fto-the-road.5733e7bd.png&w=1200&q=75'
          height={200}
          width='100%'
          style={{marginTop:30}}
        />
      </View>
      <View style={{borderTopWidth:1,borderColor:'#dbd7d5',alignItems:'center',justifyContent:'center',margin:20,padding:15}}>
        <Text style={{fontFamily:'Montserrat_700Bold', fontSize:16,textAlign:'center'}}>Şu anda en popüler olan ürünleri keşfet.</Text>
        <View 
          style={{
            marginTop:30,
            borderRadius:10,
            overflow:"hidden",
            borderColor:'#00000010',
            borderWidth:1
          }}
        >
          <View style={{overflow:'hidden',height:100,alignItems:'center'}}>
            <CustomImage
              url='https://beije.co/_next/image?url=https%3A%2F%2Fstatic.beije.co%2Fpackets_service%2Fimages%2Fpads.standard_pads.super_pantyliner.standard.png&w=1080&q=75'
              height={200}
              width={300}
              style={{marginTop:-50}}
            />

          </View>
          <View style={{padding:10,gap:10}}>
            <Text style={{fontFamily:'Montserrat_700Bold'}}>10 Günlük Ped,</Text>
            <Text style={{fontFamily:'Montserrat_700Bold'}}>10 Standart Ped,</Text>
            <Text style={{fontFamily:'Montserrat_700Bold'}}>10 Süper Ped</Text>
            <Text style={{fontFamily:'Montserrat_400Regular'}}>₺82,72</Text>
            <View style={{flexDirection:'row',justifyContent:'space-between'}}>
              <Entypo name="pencil" size={20} color="black" />
              <Text style={{fontFamily:'Montserrat_700Bold'}}>Sepete Ekle</Text>
            </View>
          </View>
        </View>
      </View>
      <Pressable style={{backgroundColor:'#000000',justifyContent:'center',alignItems:'center',borderRadius:20,padding:15,marginTop:20,alignSelf:'center'}}>
        <Text style={{fontFamily:'Montserrat_700Bold',color:'#ffffff'}}>Tüm Paketleri Gör</Text>
      </Pressable>

      <View style={{marginTop:30,paddingHorizontal:20,position:'relative',alignItems:'center',justifyContent:'center'}}>
          <CustomImage 
              url='https://beije.co/_next/static/media/cta-homepage-blog.8f7240f5.png'
              height={300}
              width='100%'
          />
          <View style={{position:'absolute',textAlign:'center',backgroundColor:'#00000050',height:'100%',justifyContent:'center',padding:10}}>
            <Text style={{fontFamily:'Montserrat_700Bold',fontSize:20,color:'#ffffff',textAlign:'center'}}>döngü</Text>
            <Text style={{fontFamily:'Montserrat_500Medium',fontSize:14,color:'#ffffff',textAlign:'center'}}>
              {`
Ürünlerimizin seni harika hissettirmesini istiyoruz. Ama onlarla yetinmedik.

döngü, bedeninle ve zihninle ilgili bilgilenmen, merak ettiklerine cevap araman, dış ve iç dünyanın farklı boyutlarını özgürce keşfedebilmen için kurduğumuz bir platform.

Bilmen, düşünmen ve daha iyi hissetmen için buradayız. Her zaman.
              `}
            </Text>
            <Pressable style={{padding:10,borderRadius:20,backgroundColor:'#ffffff',justifyContent:'center',alignItems:'center',width:'90%',alignSelf:'center'}}>
              <Text style={{fontFamily:'Montserrat_500Medium'}}>İçerikleri İncele</Text>
            </Pressable>
          </View>
      </View>

      <View style={{backgroundColor:'#ce7328',alignItems:'center',justifyContent:'center',padding:20,marginTop:20}}>
          <Text style={{fontFamily:'Montserrat_700Bold',fontSize:20,color:'#ffffff',textAlign:'center'}}>Birimiz Hepimiz.</Text>
          <Text style={{fontFamily:'Montserrat_400Regular',fontSize:12,color:'#ffffff',textAlign:'center'}}>
          {`
Regl yoksulluğuyla mücadele etmeyi her zaman kalbimizin tam ortasında tuttuk. Yola çıktığımız ilk günden beri, kârımızın %8’ini regl yoksulluğuyla mücadele etmeye ayırıyoruz.

Biz büyüdükçe, iyilik ağımız da büyümeye devam ediyor. Bağışlarımız beije ailemiz sayesinde mümkün oluyor.

İyi ki varsınız, birlikte iyi ki varız.
          `}
          </Text>
          <Pressable style={{backgroundColor:'#ffffff',justifyContent:'center',alignItems:'center',borderRadius:20,padding:15,marginTop:20,alignSelf:'center'}}>
            <Text style={{fontFamily:'Montserrat_700Bold',color:'#000000'}}>Bağış Kültürümüz</Text>
          </Pressable>
          <CustomImage
            url='https://beije.co/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fdonation-culture.b8cfe404.webp&w=1200&q=75'
            height={300}
            width='100%'
            style={{marginTop:30}}
          />
      </View>

      <Text style={{fontFamily:'Montserrat_700Bold',textAlign:'center',marginTop:30,fontSize:20}}>Sen mutluysan, biz de mutluyuz.</Text>
      <FlashList 
        data={
          [
            {
              id:1,
              videoUrl:'https://static.beije.co/front/videos/testimonial-1.mp4#t=0.001',
            },
            {
              id:2,
              videoUrl:'https://static.beije.co/front/videos/testimonial-2.mp4#t=0.001',
            },
            {
              id:3,
              videoUrl:'https://static.beije.co/front/videos/testimonial-3.mp4#t=0.003',
            },
          ]
        }
        renderItem={({item})=>(
          <Video
            ref={video}
            style={{ width: Dimensions.get('screen').width, height: videoHeight,alignSelf:'center' }}
            source={{
              uri: item.videoUrl,
            }}
            useNativeControls
            resizeMode="contain"
            isLooping
            onPlaybackStatusUpdate={status => setStatus(() => status)}
          />
        )}
        keyExtractor={item=>item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        estimatedItemSize={360}
        viewabilityConfigCallbackPairs={viewabilityConfigCallbackPairs.current}
        onViewableItemsChanged={onViewableItemsChanged}
      />
      <View style={{flexDirection:'row',gap:10,alignItems:'center',justifyContent:'center',marginVertical:20}}>
            {Children.toArray(Array(3).fill(0).map((_,index)=>{
              return (
                <View key={index} style={{backgroundColor:index+1===currentIndex?'#000000':'#d4d3d2',width:10,height:10,borderRadius:5}} />
              )
            }))}
      </View>
      {
        Children.toArray([
          {
            id:1,
            title:'beije paketlerini keşfet!',
            detail: 'Senin döngün, senin tercihin. %100 organik bambu lifinden üretilen beije Ped, %100 organik pamuktan üretilen beije Tampon ve medikal silikondan üretilen beije Menstrüel Kap arasından dilediğini seç!',
            bgColor: '#008d4a',
            button:{
              title:'Paketleri Keşfet',
              onPress:()=>{}
            }
          },
          {
            id:2,
            title:'Sadece sana özel bir paket.',
            detail: 'Senin döngün, senin tercihin. %100 organik bambu lifinden üretilen beije Ped, %100 organik pamuktan üretilen beije Tampon ve medikal silikondan üretilen beije Menstrüel Kap arasından dilediğini seç!',
            bgColor:'#442647',
            button:{
              title:'Kendi Paketini Oluştur',
              onPress:()=>{}
            }
          },
        ].map(content=>{
          return(
            <View style={{backgroundColor:content.bgColor,padding:20,marginTop:20}}>
              <Text style={{fontFamily:'Montserrat_700Bold',fontSize:20,color:'#ffffff',textAlign:'center'}}>{content.title}</Text>
              <Text style={{fontFamily:'Montserrat_400Regular',fontSize:12,color:'#ffffff',textAlign:'center',marginTop:10}}>{content.detail}</Text>
              <Pressable style={{backgroundColor:'#ffffff',justifyContent:'center',alignItems:'center',borderRadius:20,padding:15,marginTop:40,alignSelf:'center'}}>
                <Text style={{fontFamily:'Montserrat_700Bold',color:'#000000'}}>{content.button.title}</Text>
              </Pressable>
            </View>
          )
        }))
      }
      <View style={{backgroundColor:'#262626',alignItems:'center',justifyContent:'center',paddingHorizontal:5,paddingVertical:20,marginTop:20}}> 
        <Text style={{fontFamily:'Montserrat_700Bold',color:'#ffffff'}}>beije.</Text>
        <Text style={{fontFamily:'Montserrat_700Bold',color:'#bdbdbd',marginTop:10}}>Arayı açmayalım!</Text>
        <Text style={{fontFamily:'Montserrat_500Medium',color:'#96b4bd',marginTop:10,fontSize:11}}>Aylık e-gazetemiz döngü, yeni ürün ve gelişmelerden haberdar ol.</Text>
        <TextInput 
          style={{borderRadius:10,padding:10,marginTop:20,width:'70%',borderColor:'#585858',borderWidth:1}}
          placeholder='E-mail adresin'
          placeholderTextColor='#585858'
          value={email}
          onChangeText={text=>setEmail(text)}
        />
        <Pressable style={{backgroundColor:'#cacaca',justifyContent:'center',alignItems:'center',borderRadius:20,padding:15,marginTop:20,alignSelf:'center',width:'90%'}}>
          <Text style={{fontFamily:'Montserrat_700Bold',color:'#000000'}}>Gönder</Text>
        </Pressable>
        <Text style={{fontFamily:'Montserrat_400Regular',color:'#96b4bd',marginTop:10,fontSize:8}}>Abone olarak, beije KVKK ve Gizlilik Politikası'nı kabul ediyor ve beije'den haber almayı onaylıyorum.</Text>
        <View style={{flexDirection:'row',justifyContent:'space-evenly',marginTop:40}}>
          <View style={{width:200,justifyContent:'center',alignItems:'center',gap:10}}>
            <Pressable><Text style={{fontFamily:'Montserrat_700Bold',color:'#ffffff',fontSize:12}}>Paketler</Text></Pressable>
            <Pressable><Text style={{fontFamily:'Montserrat_700Bold',color:'#ffffff',fontSize:12}}>Deneme Paketi</Text></Pressable>
            <Pressable><Text style={{fontFamily:'Montserrat_700Bold',color:'#ffffff',fontSize:12}}>Ekibimize Katıl</Text></Pressable>
          </View>
          <View style={{width:150,justifyContent:'center',alignItems:'center',gap:10}}>
            <Pressable><Text style={{fontFamily:'Montserrat_700Bold',color:'#ffffff',fontSize:12}}>Blog</Text></Pressable>
            <Pressable><Text style={{fontFamily:'Montserrat_700Bold',color:'#ffffff',fontSize:12}}>Sıkça Sorulan Sorular</Text></Pressable>
            <Pressable><Text style={{fontFamily:'Montserrat_700Bold',color:'#ffffff',fontSize:12}}>Biz Kimiz</Text></Pressable>
          </View>
        </View>
        <View style={{flexDirection:'row',justifyContent:'space-evenly',marginTop:40,gap:20,borderBottomColor:'#bebebe',borderBottomWidth:1,paddingBottom:20,marginBottom:20,width:'95%'}}>
          <Pressable><Entypo name="facebook" size={16} color='#bebebe' /></Pressable>
          <Pressable><Entypo name="instagram" size={16} color='#bebebe' /></Pressable>
          <Pressable><Entypo name="twitter" size={16} color='#bebebe' /></Pressable>
          <Pressable><Entypo name="linkedin" size={16} color='#bebebe' /></Pressable>
          <Pressable><Entypo name="spotify" size={16} color='#bebebe' /></Pressable>
        </View>
        <Text style={{fontFamily:'Montserrat_400Regular',color:'#96b4bd',marginTop:10,fontSize:8}}>Hidayet Can Özcan © 2023 beije. Tüm hakları saklıdır.</Text>
      </View>
      
    </ScrollView>
  );
}