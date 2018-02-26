import {BACK} from './type'
export default {
  [BACK.actionsType] ({commit}, data) {
    console.log(data)
    commit(BACK.mutationsType,data)
  }
}
