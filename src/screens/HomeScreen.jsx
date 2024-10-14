import { View , Text, SafeAreaView} from "react-native"
import PokemonList from "../components/PokemonList";
function HomeScreen(){
    return (
       <View>
        <PokemonList/>
       </View>
     
    )
}
export default HomeScreen;