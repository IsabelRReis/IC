class KNN {
  constructor(k) {
    this.k = k;
  }

  distance(pixel1, pixel2) {
    let square_sum = 0;
    for (let i = 0; i < pixel1.length; i++) {
      const diff = pixel1[i] - pixel2[i];
      square_sum += diff * diff;
    }
    const distance = Math.sqrt(square_sum);
    return distance;
  }

  bubble_sort(v, key) {
    let has_swapped = true;
    while (has_swapped) {
      has_swapped = false;
      for (let j = 1; j < v.length; j++) {
        if (v[j][key] < v[j - 1][key]) {
          const temp = v[j - 1];
          v[j - 1] = v[j];
          v[j] = temp;
          has_swapped = true;
        }
      }
    }
  }

  mode(v) {
    const classes_count = {};
    let max_count = 0;
    let most_frequent_class = null;

    for (let i = 0; i < v.length; i++) {
      const item = v[i];
      const current_count = (classes_count[item.class] || 0) + 1;
      classes_count[item.class] = current_count;
      if (current_count > max_count) {
        max_count = current_count;
        most_frequent_class = item.class;
      }
    }

    return most_frequent_class;
  }

  knn(training_data, unknown) {
    const result = [];

    for (let i = 0; i < unknown.length; i++) {
      const row = [];
      for (let j = 0; j < unknown[i].length; j++) {
        const pixel = unknown[i][j];
        const d_t_u = [];

        for (let k = 0; k < training_data.length; k++) {
          const template = training_data[k];
          const pixelsExemplo = template.pixels;
          let sum_distance = 0;

          for (let p = 0; p < pixelsExemplo.length; p++) {
            const distance = this.distance(pixel, pixelsExemplo[p]);

            sum_distance += distance;
          }

          const average_distance = sum_distance / pixelsExemplo.length;
          d_t_u.push({
            class: template.classe,
            d: average_distance,
          });
        }

        this.bubble_sort(d_t_u, 'd');
        const most_frequent_class = this.mode(d_t_u.slice(0, this.k));
        row.push(most_frequent_class);
      }

      result.push(row);
    }

    return result;
  }
}
module.exports = {
  KNN: KNN
}  
