import { Image, Text, TouchableOpacity, View } from 'react-native';
import { theme } from '../../global/theme';
import { Feather } from '@expo/vector-icons';
import styles from './styles';

import Business from '../../assets/img/business 1.png';

type headerProps = {
  icon?: keyof typeof Feather.glyphMap;
  title?: string;
  onPress?: () => void;
  children?: React.ReactNode;
  business?: string;
  more?: boolean;
  refresh?: boolean;
  plus?: boolean;
  onMorePress?: () => void; // Added for more button
  onBusinessPress?: () => void; // Added for business button
  onRefreshPress?: () => void;
  onPlusPress?: () => void;
}

export default function Header({ icon, title, onPress, children, business, more, refresh, plus, onMorePress, onBusinessPress, onRefreshPress, onPlusPress }: headerProps) {
  return (
    <View style={styles.headerContainer}>
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', flex: 1 }}>
        {icon && (
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
            <TouchableOpacity onPress={onPress}>
              <Feather name={icon} size={24} color={theme.colors.cardTextColor} />
            </TouchableOpacity>
            {title && <Text style={[styles.headerText]}>{title}</Text>}
          </View>
        )}
        {more ? (
          <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 10 }} onPress={onMorePress}>
            <Text style={{ color: theme.colors.cardTextColor, fontFamily: theme.fontsRoboto.Bold, fontSize: 16 }}>{business}</Text>
            <Feather name='more-vertical' size={24} color={theme.colors.cardTextColor} />
          </TouchableOpacity>
        ) : business ? (
          <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 10 }} onPress={onBusinessPress}>
            <Text style={{ color: theme.colors.cardTextColor, fontFamily: theme.fontsRoboto.Bold, fontSize: 16 }}>{business}</Text>
            <Image source={Business} style={{ width: 24, height: 24, marginLeft: 5 }} />
          </TouchableOpacity>
        ) : refresh ? (
          <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 10 }} onPress={onRefreshPress}>
            <Feather name='refresh-cw' size={24} color={theme.colors.cardTextColor} />
          </TouchableOpacity>
        ) : plus ? (
          <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 10 }} onPress={onPlusPress}>
            <Feather name='plus' size={24} color={theme.colors.cardTextColor} />
          </TouchableOpacity>
        ) : null}
        {children}
      </View>
    </View>
  );
}