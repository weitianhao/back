import {BACK} from './type'
export default {
  [BACK.mutationsType] (state, data) {
    state.user = data
  }
}