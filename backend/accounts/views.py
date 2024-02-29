"""This module defines the views for account app
"""
from accounts.models import Complaint, CompTypes, Region, UserAccount, ContactAddress
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

    def get(self, request, *args, **kwargs):
        email = request.query_params.get('email', None)
        if email:
            complaints = Complaint.objects.filter(email=email)
            serializer = self.serializer_class(complaints, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response("Email parameter is required for filtering.", status=status.HTTP_400_BAD_REQUEST)

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            # you can access the file like this from serializer
            # uploaded_file = serializer.validated_data["file"]
            serializer.save()
            return Response(
                serializer.data,
                status=status.HTTP_201_CREATED
            )
        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST
        )


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


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getRegions(request, email=None):
    """Returns region data
    """
    if request.method == 'GET':
        region = []
        for obj in Region.objects.all():
            region.append(obj.__dict__['name'])
        return Response({'response': region}, status=status.HTTP_200_OK)
    return Response({}, status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getCompTypes(request):
    """Returns complaints types
    """
    if request.method == 'GET':
        ctypes = []
        for obj in CompTypes.objects.all():
            ctypes.append(obj.__dict__['name'])
        return Response({'response': ctypes}, status=status.HTTP_200_OK)
    return Response({}, status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getContAddr(request):
    """Returns contact address
    """
    if request.method == 'GET':
        addr = ContactAddress.objects.all()
        return Response({'data': addr[0].to_dict()}, status=status.HTTP_200_OK)
    return Response({}, status.HTTP_400_BAD_REQUEST)
