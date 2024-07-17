<script setup>
</script>
<template>
    <div class="container my-5">
        <nav aria-label="breadcrumb" class="">
            <ol class="breadcrumb">
                <li class="breadcrumb-item"><a href="#">Home</a></li>
                <li class="breadcrumb-item active" aria-current="page">
                    Product Details
                </li>
                <li class="ms-auto">
                    <h4><i class="bi bi-cart-plus"></i></h4>
                </li>
            </ol>

        </nav>
    </div>

    <section class="store-cart">
        <div class="container">
            <!-- Table -->
            <div class="row" data-aos="fade-up" data-aos-delay="100">
                <div class="col-6 table-responsive">
                    <table class="table table-bordered table-cart">
                        <thead>
                            <tr>
                                <td>Image</td>
                                <td>Name &amp; Seller</td>
                                <td>Price</td>
                                <td>Jumlah</td>
                                <td>Menu</td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td style="width: 20%">
                                    <img src="https://images.unsplash.com/photo-1708958151986-2b032fde35ce?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                                        alt="" class="cart-image w-25" />
                                </td>
                                <td style="width: 35%">
                                    <div class="product-title">Sofa Ternyaman</div>
                                    <div class="product-subtitle">By Andi Sukka</div>
                                </td>
                                <td style="width: 35%">
                                    <div class="product-title">$29, 11</div>
                                    <div class="product-subtitle">USD</div>
                                </td>

                                <td>1</td>

                                <td style="width: 20%">
                                    <a href="" class="btn btn-danger">Remove</a>
                                </td>
                            </tr>

                            <tr>
                                <td style="width: 20%">
                                    <img src="https://images.unsplash.com/photo-1708958151986-2b032fde35ce?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                                        alt="" class="cart-image w-25" />
                                </td>
                                <td style="width: 35%">
                                    <div class="product-title">Sofa Ternyaman</div>
                                    <div class="product-subtitle">By Andi Sukka</div>
                                </td>
                                <td style="width: 35%">
                                    <div class="product-title">$29, 11</div>
                                    <div class="product-subtitle">USD</div>
                                </td>
                                <td>1</td>

                                <td style="width: 20%">
                                    <a href="" class="btn btn-danger">Remove</a>
                                </td>
                            </tr>
                            <tr>
                                <td style="width: 20%">
                                    <img src="https://images.unsplash.com/photo-1708958151986-2b032fde35ce?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                                        alt="" class="cart-image w-25" />
                                </td>
                                <td style="width: 35%">
                                    <div class="product-title">Sofa Ternyaman</div>
                                    <div class="product-subtitle">By Andi Sukka</div>
                                </td>
                                <td style="width: 35%">
                                    <div class="product-title">$29, 11</div>
                                    <div class="product-subtitle">USD</div>
                                </td>
                                <td>1</td>

                                <td style="width: 20%">
                                    <a href="" class="btn btn-danger">Remove</a>
                                </td>
                            </tr>
                            <tr>
                                <th scope="row" colspan="2" class="text-center">
                                    Total Belanja
                                </th>
                                <td colspan="3" class="text-center"><b>Rp. 20.000</b></td>
                                <!-- <td>@twitter</td> -->
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div class="col-6">
                    <table class="table table-bordered">
                        <tbody>
                            <tr>
                                <td>ID Transaksi</td>
                                <td>12345</td>
                            </tr>
                            <tr>
                                <td>Subtotal</td>
                                <td>$150.00</td>
                            </tr>
                            <tr>
                                <td>Tanggal</td>
                                <td>2024-07-17</td>
                            </tr>
                            <tr>
                                <td>Status</td>
                                <td>Pending</td>
                            </tr>                            
                        </tbody>
                    </table>
                    <button class="btn btn-danger w-100">Pesan</button>

                </div>

            </div>

            <!-- Shippinf detail -->
            <h1 class="mt-5 pt-5 mb-3">Detail Alamat</h1>
            <form class="mb-3">
                <div class="mb-3">
                    <div class="mb-3">
                        <label for="address" class="form-label">Address</label>
                        <input type="text" class="form-control" id="address" placeholder="1234 Main St">
                    </div>
                    <label for="exampleInputEmail1" class="form-label">Email address</label>
                    <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp">
                    <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
                </div>

                <div class="mb-3">
                    <label for="city" class="form-label">No HP</label>
                    <input type="text" class="form-control" id="city">
                </div>
                <div class="mb-3">
                    <label for="zip" class="form-label">Zip Code</label>
                    <input type="text" class="form-control" id="zip">
                </div>
                <div class="mb-3">
                    <label for="state" class="form-label">Alamat Lengkap</label>
                    <textarea class="form-control" placeholder="Leave a comment here" id="floatingTextarea2"
                        style="height: 100px"></textarea>
                </div>

                <button type="submit" class="btn btn-primary">Submit</button>
            </form>


        </div>



    </section>


</template>