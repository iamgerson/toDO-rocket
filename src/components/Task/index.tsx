import { TouchableOpacity, View, Text } from "react-native";
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { styles } from "./styles";
import { theme } from "../../theme";
import { TaskDTO } from "../../dtos/TaskDTO";

export function Task({ title, isCompleted }: TaskDTO) {
  return(
    <View style={styles.taskcontainer}>
      <TouchableOpacity>
        <MaterialCommunityIcons 
          name={
            isCompleted 
            ? "checkbox-marked-circle-outline" 
            : "checkbox-blank-circle-outline"
          }
          size={22}
          color={
            isCompleted 
            ? theme.colors.brand.purple
            : theme.colors.brand.blue
          }
        />
      </TouchableOpacity>

      <View style={styles.textContainer}>
        <Text style={
          isCompleted 
          ? styles.textDone
          : styles.textCreated
        }
        >
          {title}
        </Text>
      </View>

      <TouchableOpacity>
        <MaterialCommunityIcons 
          name="trash-can-outline"
          size={20}
          color={theme.colors.base.gray300}
        />
      </TouchableOpacity>
    </View>
  )
}