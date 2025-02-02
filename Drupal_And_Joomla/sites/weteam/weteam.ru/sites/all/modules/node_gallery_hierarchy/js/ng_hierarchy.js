/**
 * @file
 * Node Gallery Hierarchy javascript functions.
 */
Drupal.behaviors.nodeGalleryHierarchyBlock = function() {
  var self = this;
  this.context = $('ul.node-gallery-hierarchy-block');
  this.parents = $('li:has(ul)', self.context);
  this.activeItem = $('li.active', self.context);

  var toggleCollapse = function() {
    if ($(this).hasClass('node-gallery-hierarchy-plus')) {
      $(this).removeClass('node-gallery-hierarchy-plus').addClass('node-gallery-hierarchy-minus');
      $(this).siblings('ul').show('normal');
    } else {
      $(this).removeClass('node-gallery-hierarchy-minus').addClass('node-gallery-hierarchy-plus');
      $(this).siblings('ul').hide('normal');
    }
  }
  
  self.parents.children('span.node-gallery-hierarchy-icon').click(toggleCollapse).addClass('node-gallery-hierarchy-plus');
  self.parents.children('ul').hide();
  // expand and show trail to active item 
  self.activeItem.parents('ul:hidden').show();
  self.activeItem.children('ul').show();
};
