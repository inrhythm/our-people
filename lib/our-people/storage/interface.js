

/**
 * This interface defines the methods that should be implemented
 * by a storage object.
 */

export default class StorageInterface {


  /**
   * Should be used to ensure the storage is ready to be used.
   * 
   * @return {Promise}
   */

  ready () {
    throw new Error(`Interface method is not implemented.`);
  }


  /**
   * Adds a new document to the data store. Must be serializable to a JSON object.
   * 
   * @param {Object} document - A JSON serializable object.
   * @return {Promise<Array>} Returns all the documents in addtions to the newly added document.
   */

  add (document) {
    throw new Error(`Interface method is not implemented.`);
  }


  /**
   * Updates an existing document in the data store. Must be serializable to a JSON object.
   *
   * @param {Object} document - a JSON serializable object.
   * @param {string} document._id - required property to find and update the object.
   * @return {Promise<Array>} Returns all the documents with the change to the document.
   */

  update (document) {
    throw new Error(`Interface method is not implemented`);
  }


  /**
   * Removes a document from the store based on the '_id' property.
   *
   * @param {Object} document - A JSON serializable object with an '_id' property.
   * @param {string} document._id - The unique id used to store the document.
   * @return {Promise<Array>} Returns all the documents less the removed document.
   */

  remove (document) {
    throw new Error(`Interface method is not implemented.`);
  }


  /**
   * Finds and returns all the documents in the store.
   *
   * @return {Promise<Array>} Returns all the documents within the store.
   */

  all () {
    throw new Error(`Interface method is not implemented.`);
  }


  /**
   * Drops the store.
   *
   * @return {Promise}
   */

  drop () {
    throw new Error(`Interface method is not implemented.`);
  }



}