import React, { useCallback, useRef } from 'react';

import { GestureHandlerRootView } from 'react-native-gesture-handler';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';

import { styles } from './styles';

export const BottmSheetModal = ({
  children,
  onPress,
  snapPoints,
  ...props
}: {
  children: React.ReactNode;
  onPress: () => void;
  snapPoints: string[];
}) => {
  // ref
  const bottomSheetRef = useRef<BottomSheet>(null);

  const handleSheetChanges = useCallback((index: number) => {
    if (index === -1) {
      onPress(); // Chama a função de fechar quando o índice é -1 (fechado)
    }
  }, [onPress]);

  return (
    <GestureHandlerRootView style={styles.container}>
      <BottomSheet
        ref={bottomSheetRef}
        index={0}
        snapPoints={snapPoints}
        enablePanDownToClose
        onChange={handleSheetChanges}
        {...props}
      >
        <BottomSheetView style={styles.contentContainer}>
          {children}
        </BottomSheetView>
      </BottomSheet>
    </GestureHandlerRootView>
  );
};
