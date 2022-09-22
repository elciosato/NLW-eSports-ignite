import { View, Modal, ModalProps, Text, TouchableOpacity, Alert } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { styles } from './styles';
import { THEME } from '../../theme';
import { CheckCircle } from 'phosphor-react-native';
import { Heading } from '../Heading';
import * as Clipboard from 'expo-clipboard';

interface Props extends ModalProps {
    discord: string;
    onClose: () => void;
}

export function DuoMatch({ discord, onClose, ...rest }: Props) {

  async function handleCopyDiscordToClipboard() {
    await Clipboard.setStringAsync(discord)
    Alert.alert('Copia!', 'Discord copiado para area de transferencia')
  }

  return (
    <Modal
        animationType='fade'
        transparent
        statusBarTranslucent
        {...rest}
    >
        <View style={styles.container}>
            <View style={styles.content}>
                <TouchableOpacity
                    style={styles.closeIcon}
                    onPress={onClose}
                >
                    <MaterialIcons 
                        name="close"
                        size={20}
                        color={THEME.COLORS.CAPTION_500}
                    />
                </TouchableOpacity>
                <CheckCircle 
                    size={64}
                    color={THEME.COLORS.SUCCESS}
                    weight="bold"
                />
                <Heading 
                    title="Let's play"
                    subtitle="Agora é só comecar a jogar!"
                    style={styles.heading}
                />
                <Text
                    style={styles.label}
                >
                    Adicione no Discord
                </Text>
                <TouchableOpacity
                    onPress={handleCopyDiscordToClipboard}
                    style={styles.discordButton}
                >
                    <Text style={styles.discord}>
                        {discord}
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    </Modal>
  );
}