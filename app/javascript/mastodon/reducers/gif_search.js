import { 
  Map as ImmutableMap,
  List as ImmutableList,
  fromJS as ConvertToImmutable } from 'immutable';
import { 
  GIF_LIST_FETCH_SUCCESS,
  GIF_SEARCH_CHANGE,
  GIF_SEARCH_CLEAR,
  GIF_SEARCH_ACTIVATE,
} from '../actions/gif_search';

const initialState = ImmutableMap({
  data: ImmutableList([
    ImmutableMap({
      id: '',
      url: '',
      preview: '',
      width: 0,
      height: 0,
    })]
  ),
  pagination: ImmutableMap({
    total_count: 0,
    count: 0,
    offset: 0,
  }),
  value: '',
  active: false,
});

export default function gif_search(state = initialState, action) {

  switch (action.type) {
  case GIF_SEARCH_ACTIVATE:
    return state.set('active', action.active);
  case GIF_LIST_FETCH_SUCCESS:
    state = ImmutableMap({
      data: ConvertToImmutable(action.search_results.data.map( item => {
        return ImmutableMap({
          id: item.id,
          url: item.url,
          preview: item.images.fixed_width.mp4,
          width: item.images.fixed_width.width,
          height: item.images.fixed_width.height,
        });
      })),
      pagination: ConvertToImmutable(action.search_results.pagination),
      value: '',
      active: true,
    });
    return state;
  case GIF_SEARCH_CHANGE:
    return state.set('value', action.value);
  case GIF_SEARCH_CLEAR:
    return initialState;
  default:
    return state;
  }

}