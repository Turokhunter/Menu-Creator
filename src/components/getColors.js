export const getColors = (option, filament) => {
    var selectedFilament = [];
    if(option.colorEnclusion === "exclude"){
      selectedFilament = filament.filter(color => {
        for(const item of option.items){
          if(item.id === color.id){
            return false;
          }
        }
        return true;
      });
    } else if(option.colorEnclusion === "include"){
      selectedFilament = filament.filter( el =>{
        return option.items.some(f => {
            return el.id === f.id;
        });
      });
    } else {
      selectedFilament = filament;
    }
    return selectedFilament;
}
