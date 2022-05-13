from django.shortcuts import render

# Create your views here.
def home(request):
    return render(request, "home.html")

def upload(request):
    if(request.method == 'POST'):
        for img in request.FILES.getlist('imgs'):
            print(11)
    return 