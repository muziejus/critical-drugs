# Emb-Line

Emb-Line is a front end for Omeka projects. 
It uses the [Omeka REST API](https://omeka.readthedocs.io/en/latest/Reference/api/index.html) to collect information about an Omeka installation to create a data layer legible to a front-end JavaScript application,
in this case [Ember](https://emberjs.com).

It follows the Omeka API for describing the items it collects, 
meaning it presupposes the following models (in rough order of implementation):

* [items](https://omeka.readthedocs.io/en/latest/Reference/api/resources/items.html) 
* [elements](https://omeka.readthedocs.io/en/latest/Reference/api/resources/elements.html)
* [item types](https://omeka.readthedocs.io/en/latest/Reference/api/resources/item_types.html)
* [element sets](https://omeka.readthedocs.io/en/latest/Reference/api/resources/element_sets.html)
* [files](https://omeka.readthedocs.io/en/latest/Reference/api/resources/files.html)
* [collections](https://omeka.readthedocs.io/en/latest/Reference/api/resources/collections.html)
* [users](https://omeka.readthedocs.io/en/latest/Reference/api/resources/users.html)
* [tags](https://omeka.readthedocs.io/en/latest/Reference/api/resources/tags.html)
* [resources](https://omeka.readthedocs.io/en/latest/Reference/api/resources/resources.html)
* [site](https://omeka.readthedocs.io/en/latest/Reference/api/resources/site.html)

Roadmap:

* Build a fake Omeka site with Mirage, using just Dublin Core elements.
* Build out an Ember data adapter to collect Omeka API information and turn it into friendly Ember models.

