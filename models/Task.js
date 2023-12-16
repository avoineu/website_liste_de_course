import Model from './Model.js';

export default class Database extends Model {

  static table = "course.liste";
  static primary = ["id_item"];
}
