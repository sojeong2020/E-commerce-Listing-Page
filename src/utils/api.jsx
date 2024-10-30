export const fetchProducts = async (query, pageNumber, sort, selectedFilters) => {
    try {
        const response = await fetch('https://spanishinquisition.victorianplumbing.co.uk/interviews/listings?apikey=yj2bV48J40KsBpIMLvrZZ1j1KwxN4u3A83H8IBvI', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            query,
            pageNumber,
            size: 0,
            additionalPages: 0,
            sort,
            facets: selectedFilters, 
          }),
        });    
        const data = await response.json();
        console.log(data,"data")
        return data;
      } catch (error) {
        console.error('Error fetching products:', error);
        throw error;
      }
}