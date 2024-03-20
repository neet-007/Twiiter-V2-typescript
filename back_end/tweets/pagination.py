from rest_framework.response import Response
from rest_framework.pagination import PageNumberPagination

class TweetsPaginator(PageNumberPagination):
    def get_paginated_response(self, data):
        previous = None
        if self.page.has_previous():
            previous = self.page.previous_page_number()
        next = None
        if self.page.has_next():
            next = self.page.next_page_number()

        return Response({
            'page':self.page.number,
            'next':next,
            'previous':previous,
            'count':self.page.paginator.num_pages,
            'results':data
        })