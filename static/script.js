$(document).ready(function () {
	if (localStorage.getItem('all')) {
		all = JSON.parse(localStorage.getItem('all'))
		for (id in all) {
			ulNode = $('#'+id+' ul')
			list = all[id]
			for (i in list) {
				addNew(ulNode, list[i])
			}
		}
	}
	else {
		all = {}
	}
	$('.collapse').collapse()
})

var addNew = function appendsToList(listObj, text) {
	liNode = '<li class="element"><h4 class="d-inline mb-0">' + text + '<button type="button" class="close float-none ml-2" onclick="del(this)">&times;</button></h4></li>'
	$(listObj).append(liNode)
	
}

var post = function getsFromFormAndCallAddNew(button) {
	value = $(button).parent().prev().val()
	$(button).parent().prev().val('')
	if (!value) {
		return
	}
	id = $(button).parents('form').parent().attr('id')
	addNew($(button).parents('form').next(), value)
	if (!all[id]) {
		all[id] = []
	}
	all[id].push(value)
	localStorage.setItem('all', JSON.stringify(all))
}

var del = function deleteElementFromList(button) {
	li = $(button).parents('li')
	pos = $(li).parent().children().index(li)
	all[$(li).parents('div').attr('id')].splice(pos, 1)
	$(li).remove()
	localStorage.setItem('all', JSON.stringify(all))
}