<<<<<<< HEAD
import {Injectable, Inject} from '@angular/core';
import {Http, Response} from '@angular/http';
// Import rxjs operators
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
// Import presta configuration and Query
import {PrestaConfiguration, Query} from './presta.interfaces';
=======
import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

// Import presta configuration
import { PrestaConfiguration } from './presta.configuration';
import { PrestaQuery } from './presta.query';
import { PrestaImageSize } from './presta.image.size';
>>>>>>> 927ad77... updated to use httpclient

@Injectable()
export class PrestaService {

<<<<<<< HEAD
    constructor(
        private http: Http,
        @Inject('prestaConfiguration') private config: PrestaConfiguration
    ) {
        console.log('Presta Service is running ...');
    }

    /**
     * [requestConstructor : analyze Query object, construct and return request url]
     * @param  {Query}  q [Query object]
     * @return {[string]}   [request url]
     */
    requestConstructor(q: Query) {

        // check if params are set, if not set default values
        if (!q.resource) { q.resource = 'products' }

        // Check if display is set if not return results with all properties
        !q.display ? q.display = `&display=full` : q.display = `&display=[${q.display}]`;

        // Generate filter query from Query.filter object if it is defined
        var filterQuery = '';

        if (q.filter) {
            for (let property in q.filter) {
                filterQuery += `&filter[${property}]=[${q.filter[property]}]`;
            }
        }

        !q.sort ? q.sort = '' : q.sort = `&sort=[${q.sort}]`;
        !q.limit ? q.limit = '' : q.limit = `&limit=${q.limit}`;

        if (!q.search) {
            return `${this.config.shopUrl}${q.resource}?ws_key=${this.config.apiKey}&output_format=JSON${q.display}${filterQuery}${q.sort}${q.limit}`;
        } else {
            return `${this.config.shopUrl}search?ws_key=${this.config.apiKey}&output_format=JSON&language=1${q.display}${filterQuery}&query=${q.search}`;
        }

    }

    /**
     * [get results from presta shop web service]
     * @param  {Query}           q [query object]
     * @return {Observable<any>}   [results object array]
     */
    get(q: Query): Observable<any> {

        return this.http
            .get(this.requestConstructor(q))
            .map((result: Response) => result.json()[q.resource]);

    }

    /**
   * [search]
   * @param  {Query}           q [query object with search term provided]
   * @return {Observable<any>}   [return results object array]
   */
    search(q: Query): Observable<any> {

        return this.http
            .get(this.requestConstructor(q))
            .map((results: Response) => results.json()[q.resource]);

    }

    /**
     * [getImage used by PrestaImage component to get images from Presta Shop Web Service]
     * @param  {string}          resource   [general, products, categories, manufacturers, suppliers, stores]
     * @param  {number}          resourceID [ID of resurce to get images for]
     * @param  {number}          imageID    [ID of image to get]
     * @param  {string}          imageSize  [cart_default, small_default, medium_default, large_default, thickbox_default, home_default, category_default]
     * @return {Observable<any>}            [url]
     */
    getImage(resource: string, resourceID: number, imageID: number, imageSize?: string): Observable<any> {

        let key: string = '';
        !this.config.imageApiKey ? key = this.config.apiKey : key = this.config.imageApiKey;

        !imageSize ? imageSize = '' : imageSize;

        return this.http
            .get(`${this.config.shopUrl}images/${resource}/${resourceID}/${imageID}/${imageSize}?ws_key=${key}`)
            .map((result: Response) => result.url);

    }
=======
  constructor(
    @Inject('prestaConfiguration') private config: PrestaConfiguration,
    private http: HttpClient
  ) {
    console.log('Presta Service: is running ...');
  }

/*
 * [requestConstructor : analyze Query object, construct and return request url]
 * @param  {PrestaQuery}  q [Query object]
 * @return {[string]}   [request url]
 */
  requestConstructor(q: PrestaQuery): string {

    // check if params are set, if not set default values
    if (!q.resource) { q.resource = 'products'; }

    // Check if display is set if not return results with all properties
    !q.display ? q.display = `&display=full` : q.display = `&display=[${q.display}]`;

    // Generate filter query from Query.filter object if it is defined
    let filterQuery = '';

    if (q.filter) {
      for (const property in q.filter) {
        if (property) {
          filterQuery += `&filter[${property}]=[${q.filter[property]}]`;
        }
      }
    }

    !q.sort ? q.sort = '' : q.sort = `&sort=[${q.sort}]`;
    !q.limit ? q.limit = '' : q.limit = `&limit=${q.limit}`;

    if (!q.search) {

      return this.config.shopUrl
              + q.resource
              + '?ws_key=' + this.config.apiKey
              + '&output_format=JSON'
              + q.display
              + filterQuery
              + q.sort
              + q.limit;

    } else {

      return this.config.shopUrl + 'search'
              + '?ws_key=' + this.config.apiKey
              + '&output_format=JSON&language=1'
              + q.display
              + filterQuery
              + '&query=' + q.search;

    }
  }

  /*
   * [get results from presta shop web service]
   * @param  {PrestaQuery}           q [query object]
   * @return {Observable<any>}   [results object array]
   */
  get(q: PrestaQuery): Observable<any> {
    return this.http.get(this.requestConstructor(q));
  }

  /*
  * [search]
  * @param  {PrestaQuery}           q [query object with search term provided]
  * @return {Observable<Response>}   [return results object array]
  */
  search(q: PrestaQuery): Observable<any> {
    return this.http.get(this.requestConstructor(q));
  }

  /*
   * [getImage used by PrestaImage component to get images from Presta Shop Web Service]
   * @param  {string} resource   [general, products, categories, manufacturers, suppliers, stores]
   * @param  {number} resourceID [ID of resurce to get images for]
   * @param  {number} imageID    [ID of image to get]
   * @param  {string} imageSize  [cart, small, medium, large, thickbox, home, category]
   * @return {string}            [url]
   */
  getProductImage(resource: string, resourceID: number, imageID?: number, imageSize?: string): string {

    // check if imageApiKey is defined if not use default apiKey (not recomended for security reasons)
    let key = '';
    !this.config.imageApiKey ? key = this.config.apiKey : key = this.config.imageApiKey;

    // check if image size is defined if not get large images by default
    if (!imageSize) { imageSize = PrestaImageSize.large; }

    if (resource === 'products') {

      return this.config.shopUrl + 'images/'
            + resource + '/'
            + resourceID + '/'
            + imageID + '/'
            + PrestaImageSize[imageSize]
            + '?ws_key=' + key;

    } else {

      return this.config.shopUrl + 'images/'
            + resource + '/'
            + resourceID
            + '?ws_key=' + key;

    }

  }

>>>>>>> 927ad77... updated to use httpclient
}
