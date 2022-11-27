
import { Pipe } from "@angular/core";
import { Column } from "../../models/board.model";

@Pipe({
  name: "sortColumn"
})
export class SortColumnPipe {
  transform(array: Array<Column>): Array<Column> {
    array.sort((a: Column, b: Column) => {
      if (a.order < b.order) {
        return -1;
      } else if (a.order > b.order) {
        return 1;
      } else {
        return 0;
      }
    });
    return array;
  }
}
