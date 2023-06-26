// @ts-nocheck
import { PropType, registerComponent } from '@uiflow/cli';

export default registerComponent('my-location-component', {  
  name: 'Location',  
  blocks: [
    {
      input: {
        type: PropType.Call,
        name: 'location',
        arguments: [],
        onEmit({ inputs, emit }) {
          function locationSuccess(geoData) {
            let location = {type: 'point', data: {lat: 0, lng: 0}};
            location.data.lat = geoData.coords.latitude;
            location.data.lng = geoData.coords.longitude;
            emit('located', { geoLocation: location});
          }

          function locationError(message) {
            emit('onError', {errorCode: message.code, errorMessage: message.message});
          }

          if (window.navigator.geolocation) {
            window.navigator.geolocation
              .getCurrentPosition(locationSuccess, locationError);
          } 
        },
      },
      output: [{ 
        type: PropType.Event,
        name: 'located',
        arguments: [
          {
            name: 'geoLocation',
            type: PropType.Object,
          }
        ]
      },
       {
        type: PropType.Event,
        name: 'onError',
        arguments: [
          {
            name: 'errorCode',
            type: PropType.String,
          },
          {
            name: 'errorMessage',
            type: PropType.String,
          }
        ]
      }]      
    }
  ]
});