import { FlatList, Image, TouchableOpacity, View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Background } from '../../components/Background';
import { styles } from './styles';
import { useNavigation, useRoute } from '@react-navigation/native';
import { gameParams } from '../../@types/navigation';
import { Entypo } from '@expo/vector-icons';
import { THEME } from '../../theme';
import logoImg from '../../assets/logo-nlw-esports.png';
import { Heading } from '../../components/Heading';
import { DuoCard, DuoCardProps } from '../../components/DuoCard';
import { useState, useEffect } from 'react';
import { DuoMatch } from '../../components/DuoMatch';
import axios from 'axios';

export function Game() {
    const route = useRoute();
    const game = route.params as gameParams;

    const navigation = useNavigation();

    const [duoCard, setDuoCard] = useState<DuoCardProps[]>([]);
    const [discordDuoSelected, setDiscordDuoSelected ] = useState(false);
    const [discord, setDiscord] = useState('');

    function handleGoBack() {
      navigation.goBack();
    }

    async function getDiscord(adId: string) {
      await axios(`http://172.20.20.21:3333/ads/${adId}/discord`).then( response => {
        setDiscord(response.data.discord);
        setDiscordDuoSelected(true);
      })
    }

    useEffect(() => {
      axios(`http://172.20.20.21:3333/games/${game.id}/ads`).then( response => {
        setDuoCard(response.data)
      })
    },[]);
        
    return (
    <Background>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={handleGoBack}
          >
            <Entypo
              name="chevron-thin-left"
              color={THEME.COLORS.CAPTION_300}
              size={20}
            />
          </TouchableOpacity>
          <Image 
            source={logoImg}
            style={styles.logo}
          />
          <View 
            style={styles.right}
          />
        </View>
        <Image 
          source={{uri: game.bannerUrl}}
          style={styles.cover}
          resizeMode='cover'
        />
        <Heading 
          title={game.title}
          subtitle="Conecte-se e comece a jogar!"
        />
        <FlatList 
          data={duoCard}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <DuoCard 
              data={item}
              onConnect={() => {
                getDiscord(item.id)
              }}
            />
            )}
          horizontal
          style={styles.containerList}
          contentContainerStyle={ duoCard.length > 0 ? styles.contentList : styles.emptyContentList }
          showsHorizontalScrollIndicator={false}
          ListEmptyComponent={() => (
            <Text style={styles.emptyListText}>
              Não há anuncios publicados ainda
            </Text>
          )}
        />
        <DuoMatch 
          onClose={() => setDiscordDuoSelected(false)}
          visible={discordDuoSelected}
          discord={discord}
        />
      </SafeAreaView>
    </Background>
  );
}