"""This module defines the views for account app
"""
from accounts.models import Complaint, CompTypes, Region, UserAccount
from accounts.serializers import ComplaintSerializer
from rest_framework.renderers import JSONRenderer
from rest_framework.decorators import api_view, renderer_classes
from rest_framework.response import Response
from rest_framework import generics
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.parsers import FormParser, MultiPartParser


class ComplaintView(generics.CreateAPIView):
    """Complaint registering view
    """
    queryset = Complaint.objects.all()
    serializer_class = ComplaintSerializer


@api_view(['GET'])
@renderer_classes((JSONRenderer,))
@permission_classes([IsAuthenticated])
def complaints(request, email=None):
    """Returns all complaints registered by the user
    """
    if request.method == 'GET':
        cmplts = []
        for obj in Complaint.objects.all():
            if obj.__dict__['email'] == email:
                cmplts.append(obj.to_dict())
        return Response({'data': cmplts}, status=status.HTTP_200_OK)
    return Response({}, status.HTTP_400_BAD_REQUEST)


@api_view(['PUT'])
@renderer_classes((JSONRenderer,))
@permission_classes([IsAuthenticated])
def updateComp(request, id=None):
    """Updates the status of a complaint specified by the id
    """
    if request.method == 'PUT':
        comps = Complaint.objects.all()
        print(request.data)
        if request.data and request.data != {}:
            for obj in comps:
                if str(obj.__dict__['id']) == str(id):
                    print(obj.__dict__['id'])
                    print(id)
                    for key, value in request.data.items():
                        setattr(obj, key, value)
                    obj.save()
                    return Response({}, status=status.HTTP_200_OK)
    return Response({}, status.HTTP_400_BAD_REQUEST)


@api_view(['PUT'])
@renderer_classes((JSONRenderer,))
@permission_classes([IsAuthenticated])
def updateUserProfile(request, email=None):
    """Updates the user profile
    """
    if request.method == 'PUT':
        user = UserAccount.objects.get_by_natural_key(email)
        if request.data and request.data != {}:
            for key, value in request.data.items():
                setattr(user, key, value)
        user.save()
        return Response({}, status=status.HTTP_200_OK)
    return Response({}, status.HTTP_400_BAD_REQUEST)
