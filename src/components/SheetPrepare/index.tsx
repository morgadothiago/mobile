import React, { useCallback, useRef, } from 'react';

import { GestureHandlerRootView } from 'react-native-gesture-handler';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';

import { styles } from './styles';

export const BottmSheetModal = ({ children }: { children: React.ReactNode }) => {
  // ref
  const bottomSheetRef = useRef<BottomSheet>(null);
  const handleSheetChanges = useCallback((index: number) => {
  }, []);

  return (
    <GestureHandlerRootView style={styles.container}>
      <BottomSheet
        ref={bottomSheetRef}
        onChange={handleSheetChanges}
        enableDynamicSizing={true}


      >

        <BottomSheetView style={styles.contentContainer}>
          {children}
        </BottomSheetView>

      </BottomSheet>

    </GestureHandlerRootView>
  );
};
