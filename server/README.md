# Tài liệu API
Định dạng trả về của server có dạng JSON và theo format 
{
    "status": "",
    "messErr": "",
    "data": ""
}
Trong đó :

- status là trạng thái trả về của server (có 2 giá trị : error - success)
- messErr: là thông báo lỗi của server, nếu status = success thì messErr rỗng
- data: dữ liệu trả về của server, nếu status = error thì data rỗng

### API

- Get Posts : [localhost:3000/api/get-posts/:start/:limit](localhost:3000/api/get-posts): lấy những bài post mới nhất
- Get Random Post : [localhost:3000/api/get-rd-post/:start/:limit](localhost:3000/api/get-rd-post): lấy những bài post có lượt đọc nhiều nhất

Trong đó :

    :start là record bắt đầu lấy (bắt buộc và phải là số)
    :limit là số record muốn lấy (bắt buộc và phải là số)

Nếu 1 trong 2 tham số bị sai định dạng thì server sẽ trả về lỗi 400 với response:
{
    "status": "error",
    "messErr": "First/Second parameter must be number and required!",
    "data": ""
}

Nếu 2 tham số đều hợp lệ nhưng không còn bài post nào nữa thì server sẽ trả về lỗi 500 với response:
{
    "status": "error",
    "messErr": "No more post!",
    "data": ""
}

Nếu 2 tham số đều hợp lệ và còn bài post thì sẽ trả về response:
{
    "status": "success",
    "messErr": "",
    "data": {
        thông tin bài post
    }
}

Trong đó: thông tin bài post bao gồm :

    id_post: mã bài post
    
    title: tiêu đề bài post
    
    url: đường dẫn đến bài post
    
    short_des: mô tả ngắn của bài post
    
    thumb: ảnh đại diện của bài post
    
    number_read: số lượt đã đọc của bài post
    
    created_at: ngày tạo bài post


- PostDetail : [localhost:3000/api/post-detail/:id-post](localhost:3000/api/post-detail)

Trong đó:

    :id-post là mã bài post (bắt buộc và phải là số)
Nếu không truyền id hoặc id không phải là số thì server sẽ trả về lỗi 400 với response:
{
    "status": "error",
    "messErr": "Parameter must be number!",
    "data": ""
}

Nếu id hợp lệ nhưng không tồn tại thì server sẽ trả về lỗi 404 với response:
{
    "status": "error",
    "messErr": "No post has id :id-post:",
    "data": ""
}

Nếu id hợp lệ & tồn tại thì sẽ trả về response:
{
    status: "success",
    messErr: "",
    data: {
        thông tin chi tiết bài post
    }
}

Trong đó: thông tin chi tiết bài post bao gồm
    
    id_post: mã bài post
    
    title: tiêu đề bài post
    
    url: đường dẫn đến bài post
    
    short_des: mô tả ngắn của bài post
    
    thumb: ảnh đại diện của bài post
    
    content: nội dung bài post
    
    number_read: số lượt đã đọc của bài post
    
    created_at: ngày tạo bài post
