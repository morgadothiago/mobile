import { StyleSheet, Dimensions } from 'react-native';
import { theme } from '../../global/theme';

const { width } = Dimensions.get('window');
const stepWidth = (width - 120) / 3; // Space for lines between steps

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  progressBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 24,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#EBEBF0',
  },
  progressStep: {
    alignItems: 'center',
    width: stepWidth,
  },
  progressDot: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#DEDEE3',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  progressLine: {
    width: 40,
    height: 2,
    backgroundColor: '#DEDEE3',
  },
  activeDot: {
    backgroundColor: '#DC1637',
  },
  activeLine: {
    backgroundColor: '#DC1637',
  },
  stepNumber: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  stepTitle: {
    fontSize: 12,
    color: '#7A7A80',
    textAlign: 'center',
  },
  activeTitle: {
    color: '#DC1637',
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  buttonContainer: {
    padding: 24,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#EBEBF0',
  },
  nextButton: {
    backgroundColor: '#DC1637',
    height: 26,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
  },
  nextButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: 'bold',
  }
}); 